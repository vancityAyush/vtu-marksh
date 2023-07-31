import {token} from "@/lib/constants";

export default function UserPage({data}) {
    console.log(data);

    return (
        <div>
            <h1>{data.usn}</h1>
            <h1>{data.name}</h1>
            {
                Object.entries(data.sem_results).map(([sem, sem_result]) => {
                        return (
                            <div key={sem}>
                                <h1>{sem}</h1>
                                {
                                    sem_result.map((exam) => {
                                        return (
                                            <div key={exam}>
                                                <h2>{exam.resultMonthYear}</h2>
                                                {
                                                    exam.subjects.map((subject) => {
                                                            return (
                                                                <div key={subject.subjectCode}>
                                                                    <h3>{subject.subjectCode}</h3>
                                                                    <h3>{subject.subjectName}</h3>
                                                                    <h3>{subject.internalMarks}</h3>
                                                                    <h3>{subject.externalMarks}</h3>
                                                                    <h3>{subject.totalMarks}</h3>
                                                                    <h3>{subject.result}</h3>
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        );
                    }
                )
            }
        </div>
    );
}

function calculateSGPA(sem_result) {
    const subjects = new Map();
    for (const exam of sem_result) {
        for (const subject of exam.subjects) {
            subjects.set(subject.subjectCode, subject);
        }
    }


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
    return result;
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