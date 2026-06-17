export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          read: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          read?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>;
      };
      projects: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          slug: string;
          description: string;
          long_description: string | null;
          tech_tags: string[];
          live_url: string | null;
          github_url: string | null;
          featured: boolean;
          order_index: number;
          status: "live" | "wip" | "archived";
        };
        Insert: Omit<
          Database["public"]["Tables"]["projects"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
    };
  };
}

export type ContactInsert =
  Database["public"]["Tables"]["contacts"]["Insert"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
