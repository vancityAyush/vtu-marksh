import {token} from "@/lib/constants";

export default function UserPage({data}) {
    console.log(data.usn);

    return (
        <div>
            {data.map((result) => (
                <div key={result.usn}>
                    <h1>{result.usn}</h1>
                    <h1>{result.name}</h1>
                    <h1>{result.semester}</h1>
                    <h1>{result.resultMonthYear}</h1>
                    <h1>{result.resultDeclaredDate}</h1>
                    <h1>{result.resultStatus}</h1>
                    <h1>{result.resultType}</h1>
                </div>
            ))}

        </div>
    );
}

export async function getServerSideProps({params}) {
    const data = await handler(params.usn);
    return {
        props: {
            data,
        },
    };
}


async function handler(usn) {
    const response = await fetchResult(usn);
    const result = await response.json();
    console.log(result);
    const sub_result = [];
    for (const subject of result) {
        const sem = await fetchSem({usn: subject.usn, yearmonth: subject.resultMonthYear, sem: subject.semester});
        const sem_result = await sem.json();
        subject.result = sem_result.subjects;
    }
    return await result;
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