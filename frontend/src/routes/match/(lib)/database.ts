import { createClient } from '@supabase/supabase-js'
import { bench, court, teamNames } from "../stores"

const SUPABASE_URL = "https://camoplmlqgfjlocstvrm.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbW9wbG1scWdmamxvY3N0dnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0MTE5ODcsImV4cCI6MjAyNjk4Nzk4N30.zMHOUtAauVOdE6BIsN2vIQes2Ru0rVsGYNnw_gmHsEE"
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function initMatch() {
  const { data, error } = await supabase.from("teams").select(`
    name, players(number, name)
  `)

  if (data == null) {
    console.log(error)
    return
  }

  teamNames.update(names => {
    names[0] = data[0].name
    names[1] = data[1].name
    return names
  })

  bench.update(bench => {
    bench[0] = data[0].players
    bench[1] = data[1].players

    // Assign random Libero + Captain
    bench[0][5].libero = true
    bench[0][5].sub = 0

    bench[1][0].libero = true
    bench[1][0].sub = 0

    bench[0][0].captain = true
    bench[1][2].captain = true

    return bench
  })
}
