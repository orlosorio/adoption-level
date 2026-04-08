/**
 * Seed script — populates Supabase with assessment data from existing TS files.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { QUESTIONS, LEVEL_LABELS } from "../lib/content";
import {
  COMPANY_QUESTIONS,
  DIMENSION_NAMES,
  DIMENSION_ORDER,
} from "../lib/companyAssessment";
import { ROLE_NAMES, ROLE_ASSESSMENTS } from "../lib/roles";
import type { RoleId } from "../lib/roles";
import type { DimensionId } from "../lib/companyAssessment";

// ---------------------------------------------------------------------------
// Load env from .env.local (Node doesn't do this automatically)
// ---------------------------------------------------------------------------
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  try {
    const envPath = resolve(__dirname, "../.env");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx < 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  } catch {
    // .env.local may not exist if env vars are set externally
  }
}

loadEnv();

// ---------------------------------------------------------------------------
// Supabase client
// ---------------------------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// ---------------------------------------------------------------------------
// Seed functions
// ---------------------------------------------------------------------------

async function seedAssessmentTypes() {
  const rows = [
    {
      id: "general",
      name_en: "General AI Adoption",
      name_es: "Adopción General de IA",
      description_en:
        "Evaluate your personal AI adoption level across 5 maturity stages.",
      description_es:
        "Evalúa tu nivel de adopción personal de IA en 5 etapas de madurez.",
    },
    {
      id: "company",
      name_en: "Company AI Adoption",
      name_es: "Adopción Empresarial de IA",
      description_en:
        "Assess your organization's AI readiness across 7 key dimensions.",
      description_es:
        "Evalúa la preparación de tu organización en IA en 7 dimensiones clave.",
    },
    {
      id: "role",
      name_en: "Role-Specific AI Adoption",
      name_es: "Adopción de IA por Rol",
      description_en:
        "Measure AI adoption tailored to your specific professional role.",
      description_es:
        "Mide la adopción de IA adaptada a tu rol profesional específico.",
    },
  ];

  const { error } = await supabase
    .from("assessment_types")
    .upsert(rows, { onConflict: "id" });

  if (error) throw new Error(`assessment_types: ${error.message}`);
  console.log(`✓ assessment_types: ${rows.length} rows`);
}

async function seedDimensions() {
  const rows = DIMENSION_ORDER.map((dimId: DimensionId, i: number) => ({
    id: dimId,
    assessment_type_id: "company",
    name_en: DIMENSION_NAMES[dimId].en,
    name_es: DIMENSION_NAMES[dimId].es,
    sort_order: i,
  }));

  const { error } = await supabase
    .from("dimensions")
    .upsert(rows, { onConflict: "id" });

  if (error) throw new Error(`dimensions: ${error.message}`);
  console.log(`✓ dimensions: ${rows.length} rows`);
}

async function seedRoles() {
  const roleIds = Object.keys(ROLE_NAMES) as RoleId[];
  const rows = roleIds.map((id, i) => ({
    id,
    name_en: ROLE_NAMES[id].en,
    name_es: ROLE_NAMES[id].es,
    sort_order: i,
  }));

  const { error } = await supabase
    .from("roles")
    .upsert(rows, { onConflict: "id" });

  if (error) throw new Error(`roles: ${error.message}`);
  console.log(`✓ roles: ${rows.length} rows`);
}

async function seedQuestions() {
  let totalInserted = 0;

  // --- General questions ---
  const generalRows = QUESTIONS.map((q, i) => ({
    assessment_type_id: "general",
    role_id: null,
    dimension_id: null,
    level: q.level,
    level_label_en: LEVEL_LABELS[q.level].en,
    level_label_es: LEVEL_LABELS[q.level].es,
    statement_en: q.en,
    statement_es: q.es,
    sort_order: i,
  }));

  const { error: genErr } = await supabase
    .from("questions")
    .upsert(generalRows, {
      onConflict: "assessment_type_id,role_id,dimension_id,sort_order",
      ignoreDuplicates: true,
    });

  // If upsert on non-unique columns fails, fallback to delete + insert
  if (genErr) {
    // Clear existing general questions and re-insert
    await supabase
      .from("questions")
      .delete()
      .eq("assessment_type_id", "general");
    const { error: insertErr } = await supabase
      .from("questions")
      .insert(generalRows);
    if (insertErr) throw new Error(`general questions: ${insertErr.message}`);
  }
  totalInserted += generalRows.length;
  console.log(`  general: ${generalRows.length} questions`);

  // --- Company questions ---
  const companyRows = COMPANY_QUESTIONS.map((q, i) => ({
    assessment_type_id: "company",
    role_id: null,
    dimension_id: q.dimension,
    level: q.level,
    level_label_en: q.levelLabel.en,
    level_label_es: q.levelLabel.es,
    statement_en: q.statement.en,
    statement_es: q.statement.es,
    sort_order: i,
  }));

  await supabase
    .from("questions")
    .delete()
    .eq("assessment_type_id", "company");
  const { error: compErr } = await supabase
    .from("questions")
    .insert(companyRows);
  if (compErr) throw new Error(`company questions: ${compErr.message}`);
  totalInserted += companyRows.length;
  console.log(`  company: ${companyRows.length} questions`);

  // --- Role questions ---
  const roleIds = Object.keys(ROLE_ASSESSMENTS) as RoleId[];
  const allRoleRows: Record<string, unknown>[] = [];

  for (const roleId of roleIds) {
    const assessment = ROLE_ASSESSMENTS[roleId];
    for (let i = 0; i < assessment.questions.length; i++) {
      const q = assessment.questions[i];
      allRoleRows.push({
        assessment_type_id: "role",
        role_id: roleId,
        dimension_id: null,
        level: q.level,
        level_label_en: q.levelLabel.en,
        level_label_es: q.levelLabel.es,
        statement_en: q.statement.en,
        statement_es: q.statement.es,
        sort_order: i,
        is_new: q.isNew ?? false,
      });
    }
  }

  // Insert in batches of 100 (Supabase has payload limits)
  await supabase.from("questions").delete().eq("assessment_type_id", "role");
  const batchSize = 100;
  for (let i = 0; i < allRoleRows.length; i += batchSize) {
    const batch = allRoleRows.slice(i, i + batchSize);
    const { error: roleErr } = await supabase.from("questions").insert(batch);
    if (roleErr)
      throw new Error(
        `role questions batch ${i / batchSize}: ${roleErr.message}`,
      );
  }
  totalInserted += allRoleRows.length;
  console.log(`  role: ${allRoleRows.length} questions (${roleIds.length} roles)`);

  console.log(`✓ questions: ${totalInserted} total`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("Seeding Supabase database...\n");

  await seedAssessmentTypes();
  await seedDimensions();
  await seedRoles();
  await seedQuestions();

  console.log("\n✅ Seed complete!");
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err);
  process.exit(1);
});
