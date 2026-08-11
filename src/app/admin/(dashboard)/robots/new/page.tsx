import { RobotForm } from "@/components/admin/robot-form";
import { createRobot } from "@/lib/actions/robots";

export default function NewRobotPage() {
  return (
    <div>
      <h1 className="text-2xl text-fg">New robot</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Hotspots and extra photos can be added after you create the robot.
      </p>
      <div className="mt-8">
        <RobotForm action={createRobot} />
      </div>
    </div>
  );
}
