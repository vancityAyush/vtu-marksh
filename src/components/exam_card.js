import "react-awesome-animated-number/dist/index.css";

export const ExamCard = ({title, examResult}) => {

    return (
        <>
            <div className="m-4">
                <div className="overflow-auto w-full">
                    <table className="table table-zebra table-auto overflow-scroll w-full">
                        <caption className="text-xl mb-3"
                        >
                            {
                                title
                            }
                        </caption>
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
                            Object.values(examResult).map((subject, index) => (
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

        </>
    );
};