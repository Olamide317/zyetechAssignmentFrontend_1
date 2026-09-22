import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-20">
      <h1 className="text-6xl text-amber-700 font-semibold">ASSIGNMENT</h1>

      <div>
        <h3 className="mx-auto mt-8 max-w-300 text-xl">
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </h3>

        <h4 className="text-lime-500 text-3xl mt-12 font-bold">
          What would you like to do today?
        </h4>

        <span className="flex flex-row gap-6 justify-center mt-8">
          <button
            onClick={() => navigate("/register")}
            className="border rounded-xl bg-[#edf6f9] border-[#edf6f9] hover:bg-[#07a2b0] hover:text-[#edf6f9] px-16 py-2"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border rounded-xl bg-[#e56c02] border-[#edf6f9] hover:bg-[#f9d3b2] hover:border-black text-white hover:text-black px-16 py-2"
          >
            Sign In
          </button>
        </span>
      </div>
    </div>
  );
}
