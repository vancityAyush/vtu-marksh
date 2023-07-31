import {token} from "@/lib/constants";


export default async function handler(req, res) {
    const {usn} = req.query;
    const response = await fetchResult(usn);
    const response_json = await response.json();
    const result = {
        usn: usn,
        name: response_json[0].name,
    };
    const sem_results = new Map();
    for (const semExam of response_json) {
        const sem = await fetchSem({usn: semExam.usn, yearmonth: semExam.resultMonthYear, sem: semExam.semester});
        const sem_result = await sem.json();
        if (!sem_results.has(semExam.semester)) {
            sem_results.set(semExam.semester, []);
        }
        sem_results.get(semExam.semester).push(sem_result);
    }
    result.sem_results = Object.fromEntries(sem_results);
    res.status(200).json(result);
}

async function fetchResult(usn) {
    return await fetch(
        "https://api.vtuconnect.in/v2/result/" + usn,
        {
            headers: {
                //Bearer Token
                'Authorization': 'Bearer ' + token,
            }
        }
    );
}

async function fetchSem({usn, yearmonth, sem}) {
    return await fetch(
        `https://api.vtuconnect.in/v2/result/sem?usn=${usn}&yearmonth=${yearmonth}&sem=${sem}`,
        {
            headers: {
                //Bearer Token
                'Authorization': 'Bearer ' + token,
            },
        }
    );
}