import { Subtitle } from "../components/Subtitle"

export const LoginPage = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget)
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData)
    console.log(data)
  }

  return (
    <>
      <Subtitle>Login</Subtitle>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col space-y-4 w-full max-w-sm mx-auto md:my-auto md:border md:border-neutral-400 md:rounded-sm md:p-4"
      >
        <div className="flex flex-col space-y-1 group">
          <label 
            htmlFor="email" 
            className="text-xs pl-1 group-focus-within:text-orange-400 transition-all duration-500"
          >
            Email
          </label>
          <input 
            type="email" 
            name="email" 
            id="email"
            autoFocus
            className="border border-neutral-400 rounded-sm p-2 outline-none focus:border-orange-400 focus:transition-all focus:duration-500"
          />
        </div>

        <div className="flex flex-col space-y-1 group">
          <label 
            htmlFor="password" 
            className="text-xs pl-1 group-focus-within:text-orange-400 transition-all duration-500"
          >
            Password
            </label>
          <input 
            type="password" 
            name="password" 
            id="password"
            className="border border-neutral-400 rounded-sm p-2 outline-none focus:border-orange-400 focus:transition-all focus:duration-500"
          />
        </div>

        <div>
          <button type="submit" className="border border-neutral-400 rounded-sm py-2 px-4 w-full transition duration-300 ease-in-out active:bg-orange-400 active:border-orange-400 hover:bg-orange-400">Login</button>
        </div>
      </form>
    </>
  )
}