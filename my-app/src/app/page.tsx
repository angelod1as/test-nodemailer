import { sendNormalMail, sendThrottledMail } from "@/lib/send-email";

export default function Home() {
  const handleSendNormal = async () => {
    "use server";
    await sendNormalMail();
  };

  const handleSendThrottled = async () => {
    "use server";
    await sendThrottledMail();
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        className="border p-1 text-black bg-white cursor-pointer"
        onClick={handleSendNormal}
      >
        Send normal email
      </button>

      <button
        className="border p-1 text-black bg-white cursor-pointer"
        onClick={handleSendThrottled}
      >
        Send throttled email
      </button>
    </div>
  );
}
