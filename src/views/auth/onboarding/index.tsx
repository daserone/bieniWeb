import { Outlet, useNavigate } from "react-router-dom";

function OnboardingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Onboarding Page</h1>
      <button onClick={() => navigate("/login")}>Go to login</button>
    </div>
  );
}

export default OnboardingPage;
