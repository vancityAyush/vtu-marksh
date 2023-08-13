import "react-awesome-animated-number/dist/index.css";
import {ExamCard} from "@/components/exam_card";

export const SemesterCard = ({sem_result}) => {

    return (
        <>
            <div className="collapse bg-base-800 m-4 ">
                <input type="checkbox" className="peer"/>
                <div
                    className="collapse-title bg-gray-900 text-primary-content peer-checked:bg-gray-900 peer-checked:text-secondary-content">
                    <div
                        className="flex flex-col md:flex-row justify-between items-center space-x-20">
                        <p className="text-2xl uppercase font-bold">Semester {sem_result.semester}</p>
                        <p className="font-bold text-xl">SGPA {sem_result.sgpa}</p>
                    </div>
                </div>
                <div
                    className="collapse-content bg-primary text-primary-content peer-checked:bg-gray-700 peer-checked:text-secondary-content">
                    {
                        <ExamCard examResult={sem_result.finalResults} title={"Consolidate Result"}/>
                    }

                    {
                        sem_result.exams.length > 1 &&
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-white"/>
                    }
                    {
                        sem_result.exams.length > 1 &&
                        sem_result.exams.map((exam, index) => (
                            <div key={index} className="m-4">
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <caption className="text-xl mb-3"
                                                 key={index}>{exam.resultMonthYear}</caption>
                                        <thead>
                                        <tr>
                                            <th>Subject Code</th>
                                            <th>Subject Name</th>
                                            <th>IA Marks</th>
                                            <th>External Marks</th>
                                            <th>Total</th>
                                            <th>Grade</th>
                                            <th>Result</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            exam.subjects.map((subject, index) => (
                                                <tr key={index}>
                                                    <th>{subject.subjectCode}</th>
                                                    <th>{subject.subjectName}</th>
                                                    <th>{subject.iaMarks}</th>
                                                    <th>{subject.eMarks}</th>
                                                    <th>{subject.total}</th>
                                                    <th>{subject.grade}</th>
                                                    <th>{subject.result}</th>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </>
    );
};