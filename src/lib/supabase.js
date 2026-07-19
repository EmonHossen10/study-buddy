import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, key);

export async function fetchStudyTasks() {
  const { data, error } = await supabase
    .from("study_tasks")
    .select("*")
    .order("study_date", { ascending: false });
  if (error) throw error;
  return data;
}

export async function addStudyTask(task) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from("study_tasks")
    .insert([{ ...task, user_id: user.id }]);
  if (error) throw error;
}

export async function updateStudyTask(id, task) {
  const { error } = await supabase.from("study_tasks").update(task).eq("id", id);
  if (error) throw error;
}

export async function deleteStudyTask(id) {
  const { error } = await supabase.from("study_tasks").delete().eq("id", id);
  if (error) throw error;
}
