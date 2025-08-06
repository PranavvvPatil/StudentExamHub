
export default function Result() {
  const score = localStorage.getItem("score");
  return (
    <div className="max-w-md mx-auto md:mt-[200px] md:mb-[246.5px] mt-auto mb-auto bg-white p-9  rounded text-center">
      <h2 className="text-2xl font-bold mb-4">Your Exam Result</h2>
      <div className="text-4xl">{score}</div>
    </div>
  );
}
