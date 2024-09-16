export interface Modules {
  id: number;
  name: string;
  slug: string;
  display_name_singular: string;
  display_name_plural: string;
  icon: string;
  model_name: string;
  policy_name: string;
  controller: string;
  description: string;
  generate_permissions: number;
  server_side: number;
  details: any | null;
  created_at: string;
  updated_at: string;
  visibilityStatus?:string
}
