import {token} from "@/lib/constants";

export default async function handler(req, res) {
    const {usn} = req.query;
    const data = await fetchResult(usn);
    const result = await data.json();
    console.log(result);
    const sub_result = [];
    for (const subject of result) {
        const sem = await fetchSem({usn: subject.usn, yearmonth: subject.resultMonthYear, sem: subject.semester});
        const sem_result = await sem.json();
        subject.result = sem_result.subjects;
        console.log(sem_result);
    }

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