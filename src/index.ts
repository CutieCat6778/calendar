import { WebUntis } from "webuntis";

const untis = new WebUntis(
  "FTS-Villingen-Schwenningen",
  process.env.USERNAME || "",
  process.env.PASSWORD || "",
  "arche.webuntis.com",
);

await untis.login();

function getCurrentWeekDates() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay(); // Get the current day of the week (0-6, where 0 is Sunday)
  const startOfWeek = new Date(currentDate); // Clone the current date to manipulate it
  startOfWeek.setDate(currentDate.getDate() - dayOfWeek); // Set to the start of the week (Sunday)

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(startOfWeek);
    weekDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(weekDate);
  }

  return weekDates;
}

Bun.serve({
  port: 8080,
  async fetch(req: any) {
    const url = new URL(req.url);
    let weekDates = getCurrentWeekDates();

    let date = url.pathname;
    let data = await untis.getOwnTimetableFor(weekDates[parseInt(date)]);

    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json",
      },
    });
  },
});
