import { WebUntis } from "webuntis";
import { Elysia } from "elysia";

const untis = new WebUntis(
  "FTS-Villingen-Schwenningen",
  "NguyenThi",
  "!Txzje2006",
  "arche.webuntis.com",
);

const app = new Elysia();

function getWeekDates(weeksAhead = 0) {
  const currentDate = new Date();
  currentDate.setHours(4);
  const dayOfWeek = currentDate.getDay(); // Get the current day of the week (0-6, where 0 is Sunday)
  const startOfWeek = new Date(currentDate); // Clone the current date to manipulate it
  startOfWeek.setDate(currentDate.getDate() - dayOfWeek + weeksAhead * 7); // Set to the start of the week, adjusted by weeksAhead

  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(startOfWeek);
    weekDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(weekDate);
  }

  return weekDates;
}

app.on("start", async () => {
  console.log("Logging in...");
  console.log("Logged in...");
});

app.get("/", () => "Hello World!");

app.get("/:id", async ({ params: { id } }) => {
  try {
    const data = await untis.login();
    console.log(data);
  } catch (e: any) {
    return {
      error: e.toString(),
    };
  }

  console.log(id, untis);

  let weekDates = getWeekDates(0);

  console.log(weekDates, weekDates[parseInt(id)], weekDates[parseInt(id) + 1]);

  const data = await untis.getOwnTimetableForRange(
    weekDates[parseInt(id)],
    weekDates[parseInt(id) + 1],
  );

  console.log(data);

  return {
    data,
  };
});

app.listen(process.env.PORT || 4200);
