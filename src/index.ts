import { WebUntis } from 'webuntis';

const untis = new WebUntis('FTS-Villingen-Schwenningen', process.env.USERNAME || "", process.env.PASSWORD || "", 'arche.webuntis.com');

await untis.login();
const timetable = await untis.getOwnTimetableForToday();

Bun.serve({
    port: 8080,
    fetch(req) {
        return new Response(JSON.stringify(timetable), {
            headers: {
                'content-type': 'application/json',
            },
        });
    },
});