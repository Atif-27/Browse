import { Outlet } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div>
      SettingsPage
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;
