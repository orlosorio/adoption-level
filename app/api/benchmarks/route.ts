import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const assessmentTypeId = params.get("type");
    const roleId = params.get("roleId") || null;
    const country = params.get("country");
    const companyType = params.get("companyType");
    const industry = params.get("industry");

    if (!assessmentTypeId) {
      return NextResponse.json(
        { error: "Missing 'type' parameter" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServer();

    // Fetch all relevant segments in one query
    const segments: string[] = ["_all"];
    const segmentFilters: [string, string][] = [["overall", "_all"]];

    if (country) segmentFilters.push(["country", country]);
    if (companyType) segmentFilters.push(["company_type", companyType]);
    if (industry) segmentFilters.push(["industry", industry]);

    // Build OR filter for all segments at once
    let query = supabase
      .from("benchmark_aggregates")
      .select(
        "segment_type, segment_value, submission_count, score_sum, score_buckets, percentile_data",
      )
      .eq("assessment_type_id", assessmentTypeId);

    if (roleId) {
      query = query.eq("role_id", roleId);
    } else {
      query = query.is("role_id", null);
    }

    // Filter to only the segments we care about
    const orClauses = segmentFilters.map(
      ([type, value]) =>
        `and(segment_type.eq.${type},segment_value.eq.${value})`,
    );
    query = query.or(orClauses.join(","));

    const { data: aggregates, error } = await query;

    if (error) {
      console.error("Benchmark query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch benchmarks" },
        { status: 500 },
      );
    }

    // Transform into the shape the frontend expects
    const result: Record<
      string,
      {
        count: number;
        avgScore: number;
        percentileData: Record<string, number>;
      }
    > = {};

    for (const agg of aggregates ?? []) {
      const key =
        agg.segment_type === "overall" ? "overall" : agg.segment_value;
      result[agg.segment_type] = {
        count: agg.submission_count,
        avgScore:
          agg.submission_count > 0
            ? Math.round(agg.score_sum / agg.submission_count)
            : 0,
        percentileData: agg.percentile_data ?? {},
      };
    }

    // Calculate user percentile for each segment
    const userScore = Number(params.get("score") ?? 0);
    const userMaxScore = Number(params.get("maxScore") ?? 1);
    const userPct =
      userMaxScore > 0 ? Math.round((userScore / userMaxScore) * 100) : 0;

    const benchmarkResult: {
      totalRespondents: number;
      overall: number;
      country: number;
      companyType: number;
      industry: number;
    } = {
      totalRespondents: result["overall"]?.count ?? 0,
      overall: computePercentile(
        aggregates?.find((a) => a.segment_type === "overall"),
        userPct,
      ),
      country: country
        ? computePercentile(
            aggregates?.find((a) => a.segment_type === "country"),
            userPct,
          )
        : 50,
      companyType: companyType
        ? computePercentile(
            aggregates?.find((a) => a.segment_type === "company_type"),
            userPct,
          )
        : 50,
      industry: industry
        ? computePercentile(
            aggregates?.find((a) => a.segment_type === "industry"),
            userPct,
          )
        : 50,
    };

    return NextResponse.json(benchmarkResult);
  } catch (err) {
    console.error("Benchmark route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Compute the user's percentile within a segment based on score buckets.
 * Returns 0-100 representing "you scored higher than X% of respondents".
 */
function computePercentile(
  aggregate: { score_buckets: { min: number; max: number; count: number }[]; submission_count: number } | undefined | null,
  userPct: number,
): number {
  if (!aggregate || aggregate.submission_count === 0) return 50; // default when no data

  const buckets = aggregate.score_buckets ?? [];
  const total = aggregate.submission_count;

  // Sort buckets by min
  const sorted = [...buckets].sort((a, b) => a.min - b.min);

  // Count submissions scoring below the user
  let below = 0;
  for (const bucket of sorted) {
    const bucketMid = (bucket.min + bucket.max) / 2;
    if (bucketMid < userPct) {
      below += bucket.count;
    } else if (bucket.min <= userPct && userPct < bucket.max) {
      // User falls in this bucket — count roughly half
      const fraction = (userPct - bucket.min) / (bucket.max - bucket.min || 1);
      below += Math.round(bucket.count * fraction);
    }
  }

  return Math.max(1, Math.min(99, Math.round((below / total) * 100)));
}
