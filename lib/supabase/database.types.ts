export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      demographic_field_translations: {
        Row: {
          field_id: string;
          helper: string | null;
          label: string;
          locale: string;
          placeholder: string | null;
        };
        Insert: {
          field_id: string;
          helper?: string | null;
          label: string;
          locale: string;
          placeholder?: string | null;
        };
        Update: {
          field_id?: string;
          helper?: string | null;
          label?: string;
          locale?: string;
          placeholder?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'demographic_field_translations_field_id_fkey';
            columns: ['field_id'];
            isOneToOne: false;
            referencedRelation: 'demographic_fields';
            referencedColumns: ['id'];
          },
        ];
      };
      demographic_fields: {
        Row: {
          created_at: string;
          field_kind: string;
          id: string;
          is_active: boolean;
          slug: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          field_kind: string;
          id?: string;
          is_active?: boolean;
          slug: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          field_kind?: string;
          id?: string;
          is_active?: boolean;
          slug?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      demographic_option_translations: {
        Row: {
          label: string;
          locale: string;
          option_id: string;
        };
        Insert: {
          label: string;
          locale: string;
          option_id: string;
        };
        Update: {
          label?: string;
          locale?: string;
          option_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'demographic_option_translations_option_id_fkey';
            columns: ['option_id'];
            isOneToOne: false;
            referencedRelation: 'demographic_options';
            referencedColumns: ['id'];
          },
        ];
      };
      demographic_options: {
        Row: {
          created_at: string;
          field_id: string;
          id: string;
          max_val: number | null;
          min_val: number | null;
          slug: string;
          sort_order: number;
        };
        Insert: {
          created_at?: string;
          field_id: string;
          id?: string;
          max_val?: number | null;
          min_val?: number | null;
          slug: string;
          sort_order?: number;
        };
        Update: {
          created_at?: string;
          field_id?: string;
          id?: string;
          max_val?: number | null;
          min_val?: number | null;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'demographic_options_field_id_fkey';
            columns: ['field_id'];
            isOneToOne: false;
            referencedRelation: 'demographic_fields';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      question_tier_translations: {
        Row: {
          locale: string;
          name: string | null;
          short_label: string;
          tier_id: string;
        };
        Insert: {
          locale: string;
          name?: string | null;
          short_label: string;
          tier_id: string;
        };
        Update: {
          locale?: string;
          name?: string | null;
          short_label?: string;
          tier_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'question_tier_translations_tier_id_fkey';
            columns: ['tier_id'];
            isOneToOne: false;
            referencedRelation: 'question_tiers';
            referencedColumns: ['id'];
          },
        ];
      };
      question_tiers: {
        Row: {
          created_at: string;
          id: string;
          ordinal: number;
          quiz_id: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          ordinal: number;
          quiz_id: string;
          sort_order: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          ordinal?: number;
          quiz_id?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'question_tiers_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: false;
            referencedRelation: 'quizzes';
            referencedColumns: ['id'];
          },
        ];
      };
      question_translations: {
        Row: {
          help_text: string | null;
          locale: string;
          question_id: string;
          statement: string;
        };
        Insert: {
          help_text?: string | null;
          locale: string;
          question_id: string;
          statement: string;
        };
        Update: {
          help_text?: string | null;
          locale?: string;
          question_id?: string;
          statement?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'question_translations_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
        ];
      };
      questions: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          quiz_id: string;
          sort_order: number;
          tier_id: string | null;
          updated_at: string;
          weight: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          quiz_id: string;
          sort_order: number;
          tier_id?: string | null;
          updated_at?: string;
          weight?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          quiz_id?: string;
          sort_order?: number;
          tier_id?: string | null;
          updated_at?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'questions_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: false;
            referencedRelation: 'quizzes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'questions_tier_id_fkey';
            columns: ['tier_id'];
            isOneToOne: false;
            referencedRelation: 'question_tiers';
            referencedColumns: ['id'];
          },
        ];
      };
      quiz_attempts: {
        Row: {
          anon_token: string | null;
          completed_at: string | null;
          created_at: string;
          demographics_snapshot: Json | null;
          email: string | null;
          email_consent: boolean;
          id: string;
          is_complete: boolean;
          locale: string;
          max_score: number;
          quiz_id: string;
          quiz_version: number;
          score: number;
          score_pct: number | null;
          session_id: string | null;
          started_at: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          anon_token?: string | null;
          completed_at?: string | null;
          created_at?: string;
          demographics_snapshot?: Json | null;
          email?: string | null;
          email_consent?: boolean;
          id?: string;
          is_complete?: boolean;
          locale: string;
          max_score?: number;
          quiz_id: string;
          quiz_version?: number;
          score?: number;
          score_pct?: number | null;
          session_id?: string | null;
          started_at?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          anon_token?: string | null;
          completed_at?: string | null;
          created_at?: string;
          demographics_snapshot?: Json | null;
          email?: string | null;
          email_consent?: boolean;
          id?: string;
          is_complete?: boolean;
          locale?: string;
          max_score?: number;
          quiz_id?: string;
          quiz_version?: number;
          score?: number;
          score_pct?: number | null;
          session_id?: string | null;
          started_at?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'quiz_attempts_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: false;
            referencedRelation: 'quizzes';
            referencedColumns: ['id'];
          },
        ];
      };
      quiz_insights: {
        Row: {
          avg_score: number | null;
          band_ordinal: number | null;
          id: string;
          p25: number | null;
          p50: number | null;
          p75: number | null;
          quiz_id: string;
          sample_size: number;
          segment_field_id: string | null;
          segment_option_id: string | null;
          updated_at: string;
        };
        Insert: {
          avg_score?: number | null;
          band_ordinal?: number | null;
          id?: string;
          p25?: number | null;
          p50?: number | null;
          p75?: number | null;
          quiz_id: string;
          sample_size?: number;
          segment_field_id?: string | null;
          segment_option_id?: string | null;
          updated_at?: string;
        };
        Update: {
          avg_score?: number | null;
          band_ordinal?: number | null;
          id?: string;
          p25?: number | null;
          p50?: number | null;
          p75?: number | null;
          quiz_id?: string;
          sample_size?: number;
          segment_field_id?: string | null;
          segment_option_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'quiz_insights_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: false;
            referencedRelation: 'quizzes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'quiz_insights_segment_field_id_fkey';
            columns: ['segment_field_id'];
            isOneToOne: false;
            referencedRelation: 'demographic_fields';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'quiz_insights_segment_option_id_fkey';
            columns: ['segment_option_id'];
            isOneToOne: false;
            referencedRelation: 'demographic_options';
            referencedColumns: ['id'];
          },
        ];
      };
      quiz_responses: {
        Row: {
          answered_at: string;
          attempt_id: string;
          id: string;
          question_id: string;
          value: number;
          weight: number;
        };
        Insert: {
          answered_at?: string;
          attempt_id: string;
          id?: string;
          question_id: string;
          value: number;
          weight?: number;
        };
        Update: {
          answered_at?: string;
          attempt_id?: string;
          id?: string;
          question_id?: string;
          value?: number;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'quiz_responses_attempt_id_fkey';
            columns: ['attempt_id'];
            isOneToOne: false;
            referencedRelation: 'quiz_attempts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'quiz_responses_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
        ];
      };
      quizzes: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          slug: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          slug: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      result_band_copies: {
        Row: {
          description: string;
          locale: string;
          next_step: string;
          ordinal: number;
          quiz_id: string;
          short_label: string | null;
        };
        Insert: {
          description: string;
          locale: string;
          next_step: string;
          ordinal: number;
          quiz_id: string;
          short_label?: string | null;
        };
        Update: {
          description?: string;
          locale?: string;
          next_step?: string;
          ordinal?: number;
          quiz_id?: string;
          short_label?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'result_band_copies_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: false;
            referencedRelation: 'quizzes';
            referencedColumns: ['id'];
          },
        ];
      };
      user_demographics: {
        Row: {
          field_id: string;
          numeric_value: number | null;
          option_id: string | null;
          text_value: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          field_id: string;
          numeric_value?: number | null;
          option_id?: string | null;
          text_value?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          field_id?: string;
          numeric_value?: number | null;
          option_id?: string | null;
          text_value?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_demographics_field_id_fkey';
            columns: ['field_id'];
            isOneToOne: false;
            referencedRelation: 'demographic_fields';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_demographics_option_id_fkey';
            columns: ['option_id'];
            isOneToOne: false;
            referencedRelation: 'demographic_options';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      recompute_quiz_insights: {
        Args: { p_quiz_id: string };
        Returns: undefined;
      };
      submit_attempt: {
        Args: { p_locale: string; p_quiz_id: string; p_responses: Json };
        Returns: {
          attempt_id: string;
          max_score: number;
          score: number;
          score_pct: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
