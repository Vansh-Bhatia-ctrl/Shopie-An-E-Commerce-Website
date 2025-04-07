export default function SignInError() {
    return (
      <div className="flex items-center justify-center mt-4 mb-4 animate-slide-in ml-2 mr-2">
        <div className="flex items-center justify-center bg-red-500 w-[450px] rounded-md p-2 shadow-md">
          <p className="text-white-300 font-medium">
            Error logging in, please check your Email-ID or Password.
          </p>
        </div>
      </div>
    );
  }
  