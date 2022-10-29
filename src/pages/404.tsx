import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FourOhFour = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <div />;
};
