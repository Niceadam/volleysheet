import { createClient } from '@supabase/supabase-js'
import { TIMEOUT_TIME, courtData, teamNames, timeOut } from '@/stores'

const SUPABASE_URL = "https://camoplmlqgfjlocstvrm.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbW9wbG1scWdmamxvY3N0dnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0MTE5ODcsImV4cCI6MjAyNjk4Nzk4N30.zMHOUtAauVOdE6BIsN2vIQes2Ru0rVsGYNnw_gmHsEE"
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function initTest() {
  let { data } = await supabase.from("teams").select("*")

  for (let i = 0; i < data.length; i++) {
    let team = data[i]
    teamNames.update(names => {
      names[i] = team.name
      return names
    })

    let { data: players } = await supabase.from("players").select("name").eq("team_id", team.id)

    courtData.update(data => {
      data = []
      for (const player of players) {
        data.push([player.shirt_number, player.name, ""])
      }
      return data
    })
  }
}

import Timer from 'easytimer.js';

export function timeOutTimer(node: HTMLElement) {
  var timer = new Timer();
  timer.start({ countdown: true, startValues: { seconds: TIMEOUT_TIME } });

  node.style.setProperty('--thickness', '5px');
  function update() {
    node.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
    let progress = (timer.getTotalTimeValues().seconds / TIMEOUT_TIME) * 100;
    node.style.setProperty('--value', progress.toString());
  }

  update();
  timer.addEventListener('secondsUpdated', function(_e) {
    update();
  });

  timer.addEventListener('targetAchieved', function(_e) {
    timeOut.set(false)
  });
}
