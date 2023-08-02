import {credits, token} from "@/lib/constants";

export default function UserPage({data}) {
    return (
        <div>
            <h1>USN : {data.usn}</h1>
            <h1>{data.name}</h1>
            <h1>CGPA : {data.cgpa}</h1>
            <table>
                <thead>
                <tr>
                    <th>Semester</th>
                    <th>SGPA</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(data.sem_results).map((sem_result, index) => (
                    <tr key={index}>
                        <td>Semester {sem_result.semester}</td>
                        <td>{sem_result.sgpa}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}

function pointsToGrade(points) {
    if (points >= 90) {
        return 10;
    } else if (points >= 80) {
        return 9;
    } else if (points >= 70) {
        return 8;
    } else if (points >= 60) {
        return 7;
    } else if (points >= 50) {
        return 6;
    } else if (points >= 40) {
        return 4;
    } else {
        return 0;
    }
}

function calculateCGPA(result) {
    let totalCredits = 0;
    let totalPoints = 0;
    for (const sem_result of Object.values(result.sem_results)) {
        calculateSGPA(sem_result);
        totalCredits += sem_result.credits;
        totalPoints += sem_result.credits * sem_result.sgpa;
    }

    result.cgpa = (totalPoints / totalCredits).toFixed(2);
}

function calculateSGPA(sem_result) {
    const subjects = new Map();
    for (const exam of sem_result.exams) {
        for (const subject of exam.subjects) {
            subjects.set(subject.subjectCode, subject);
        }
    }
    let totalCredits = 0;
    let totalPoints = 0;
    for (const subject of subjects.values()) {
        totalCredits += credits.get(subject.subjectCode) * pointsToGrade(subject.total);
        totalPoints += credits.get(subject.subjectCode);
    }
    sem_result.sgpa = (totalCredits / totalPoints).toFixed(2);
    sem_result.credits = totalPoints;
    sem_result.scoredCredits = totalCredits;
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
            sem_results.set(semExam.semester, {
                semester: semExam.semester,
                credits: 0,
                sgpa: 0,
                exams: [],
            });
        }
        sem_results.get(semExam.semester).exams.push(sem_result);
    }
    result.sem_results = Object.fromEntries(sem_results);
    calculateCGPA(result);
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