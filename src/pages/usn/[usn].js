import {credits, token} from "@/lib/constants";
import {NumberAnim} from "@/components/number_anim";
import {useState} from "react";
import {SemesterCard} from "@/components/semester_card";

export default function UserPage({data}) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 w-screen overflow-hidden">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 ">
                    VTU Results for {data.name}
                </p>
                <div
                    className="fixed bottom-0 left-0 flex h-18 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <p className="text-2xl">USN : {data.usn}</p>
                </div>
            </div>
            <div>
                <div className="stat">
                    <div className="stat-title">CGPA</div>
                    <div className="stat-value text-8xl">
                        <NumberAnim num={data.cgpa}/>
                    </div>
                </div>
                <h1>
                    <div className="stat">
                        <div className="stat-title">Backlogs</div>
                        <div className="stat-value text-8xl">
                            <NumberAnim num={data.backlogs}/>
                        </div>
                    </div>
                </h1>
            </div>

            <div className="m-5">
                {Object.values(data.sem_results).map((sem_result, index) => (
                    <SemesterCard key={index} sem_result={sem_result}/>
                ))}
            </div>
            <div>
            </div>
        </main>
    );
}


const getGradePoints = (grade) => {
    switch (grade) {
        case "S":
            return 10;
        case "A":
            return 9;
        case "B":
            return 8;
        case "C":
            return 7;
        case "D":
            return 6;
        case "E":
            return 4;
        default:
            return 0;
    }
}

function getGrade(points) {
    if (points >= 90) {
        return "S";
    } else if (points >= 80) {
        return "A";
    } else if (points >= 70) {
        return "B";
    } else if (points >= 60) {
        return "C";
    } else if (points >= 50) {
        return "D";
    } else if (points >= 40) {
        return "E";
    } else {
        return "F";
    }
}

function calculateCGPA(result) {
    let totalCredits = 0;
    let totalPoints = 0;
    let totalBacklogs = 0;
    for (const sem_result of Object.values(result.sem_results)) {
        calculateSGPA(sem_result);
        totalCredits += sem_result.credits;
        totalPoints += sem_result.credits * sem_result.sgpa;
        totalBacklogs += sem_result.backlogs;
    }
    result.backlogs = totalBacklogs;
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
    let totalBacklogs = 0;
    for (const subject of subjects.values()) {
        subject.grade = getGrade(subject.total);
        totalCredits += credits.get(subject.subjectCode) * getGradePoints(subject.grade);
        totalPoints += credits.get(subject.subjectCode);
        if (subject.result !== "P") {
            totalBacklogs++;
        }
    }
    sem_result.sgpa = (totalCredits / totalPoints).toFixed(2);
    sem_result.credits = totalPoints;
    sem_result.scoredCredits = totalCredits;
    sem_result.finalResults = Object.fromEntries(subjects);
    sem_result.backlogs = totalBacklogs;
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
                finalResults: {},
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