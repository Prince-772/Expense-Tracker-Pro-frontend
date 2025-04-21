import React, { use, useCallback, useContext, useRef, useState } from 'react'
import { AuthContext, MessageContext } from "../Context/Auth.context"
import { ProfileContext } from '../Context/profile.context'
import ErrorMessage from '../components/authMessages/ErrorMessage'
import SuccessMessage from '../components/authMessages/SuccessMessage'
import ConfirmMessage from '../components/authMessages/ConfirmMessage'
import { DashboardContext } from '../Context/userDashboard.context'
import Loader from '../components/Loader/loader'
import { Pencil, X } from 'lucide-react'


const Profile = () => {
  const { AuthError, AuthSuccess, AuthConfirm } = useContext(MessageContext)
  const { handleCloseError, profileLoading, handleCloseSuccess, handleSaveChanges, handleOnConfirm, logoutLoading } = useContext(ProfileContext)
  const { user } = useContext(AuthContext)
  const dashboardLoading = useContext(DashboardContext).loading
  const [isNameEdting, setIsNameEdting] = useState(false)
  const [isProfessionEdting, setIsProfessionEdting] = useState(false)
  const [nameRef, professionRef] = [useRef(null), useRef(null)]
  const joinedDate = new Date(user?.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
  const [isDetailsChanged, setIsDetailsChanged] = useState(false)

  const handleOnChange = useCallback(() => {
    if (!(user?.name === nameRef.current.value) || !((user?.profession || "") === professionRef.current.value)) {
      setIsDetailsChanged(true)
    } else {
      setIsDetailsChanged(false)
    }
  }, [user?.name, user?.profession])



  return (
    <div className="flex min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-700">
      {AuthError && (
        <ErrorMessage value={AuthError} onClose={handleCloseError} />
      )}
      {AuthSuccess && (
        <SuccessMessage
          value={AuthSuccess}
          onClose={(e) => handleCloseSuccess(e)}
        />
      )}
      {AuthConfirm && (
        <ConfirmMessage
          value={AuthConfirm}
          onConfirm={handleOnConfirm}
        />
      )}
      {(dashboardLoading || profileLoading || logoutLoading) && <Loader />}
      {/* Main Content */}
      <main className="flex-1 px-3 lg:px-6 py-6">
        <div className="w-full border-2 rounded-2xl shadow-lg px-3 md:px-6 py-6 bg-white dark:bg-gray-600">
          <div className="flex flex-col md:p-4">

            <div className="flex flex-col items-center gap-4">
              <div className="w-20 md:w-32 h-20 md:h-32 rounded-full bg-green-700 flex items-center justify-center">
                <div className="text-2xl md:text-4xl text-white font-semibold">{user?.name.charAt(0).toUpperCase()}</div>
              </div>

              <div className={`name relative ${isNameEdting ? "" : "pr-7"}`}>
                <div className={`text-lg md:text-2xl font-bold text-center outline-none dark:text-white ${isNameEdting ? "hidden" : "block"}`}>{user?.name}</div>
                <input
                  className={`text-lg text-blue-500 dark:text-blue-400 w-full md:text-2xl font-bold text-center border-b-1 focus:border-blue-600 focus:dark:border-gray-200 outline-none ${isNameEdting ? "block pr-5 md:pr-7" : "hidden"}`}
                  defaultValue={user?.name}
                  onChange={handleOnChange}
                  ref={nameRef} />
                {!isNameEdting && <Pencil
                  onClick={() => {
                    setIsNameEdting(true)
                    setTimeout(() => {
                      nameRef.current?.focus()
                    }, 0)
                  }}
                  className={`absolute dark:text-white hover:text-blue-500 active:text-blue-500 cursor-pointer top-[calc(50%-8px)] md:top-[calc(50%-10px)] right-0 w-4 md:w-5 h-4 md:h-5`} />}
                {isNameEdting && <X
                  onClick={() => {
                    setIsNameEdting(false)
                    nameRef.current.value = user?.name
                    handleOnChange()
                  }}
                  className={`absolute text-red-600 dark:text-red-800 cursor-pointer top-[calc(50%-8px)] md:top-[calc(50%-10px)] right-1 w-4 md:w-5 h-4 md:h-5`} />}
              </div>
            </div>
            <hr className='my-5 text-gray-400' />
            <div className="space-y-4 flex flex-col items-start">
              <div className={`profession relative flex justify-between ${isProfessionEdting ? "" : "pr-7"}`}>
                <span className='text-sm md:text-lg font-semibold mr-1 text-nowrap text-gray-700 dark:text-gray-300'>Profession : </span>
                <div className={`text-sm md:text-lg font-semibold text-center dark:text-gray-100 ${isProfessionEdting ? "hidden" : "block"}`}>
                  <span>{user?.profession || "Unknown"}</span>
                </div>
                <input
                  className={`text-sm md:text-lg w-2/3 font-semibold text-center text-blue-500 dark:text-blue-400 border-b-1 focus:border-blue-600 focus:dark:border-gray-200 outline-none ${isProfessionEdting ? "block pr-4 md:pr-7" : "hidden"}`}
                  defaultValue={user?.profession || ""}
                  onChange={handleOnChange}
                  ref={professionRef} />
                {!isProfessionEdting && <Pencil
                  onClick={() => {
                    setIsProfessionEdting(true)
                    setTimeout(() => {
                      professionRef.current?.focus()
                    }, 0)
                  }}
                  className={`absolute dark:text-white hover:text-blue-500 active:text-blue-500 cursor-pointer top-[calc(50%-7px)] md:top-[calc(50%-8px)] right-0 w-3.5 md:w-4 h-3.5 md:h-4`} />}
                {isProfessionEdting && <X
                  onClick={() => {
                    setIsProfessionEdting(false)
                    professionRef.current.value = user?.profession || ""
                    handleOnChange()
                  }}
                  className={`absolute text-red-600 dark:text-red-800 cursor-pointer top-[calc(50%-7px)] md:top-[calc(50%-8px)] right-0 w-3.5 md:w-4 h-3.5 md:h-4`} />}
              </div>

              <div className='flex'>
                <span className='text-sm md:text-lg font-semibold mr-1 text-gray-700 text-nowrap dark:text-gray-300'>Email : </span>
                <div className={`text-sm md:text-lg font-semibold text-center dark:text-gray-100`}>
                  <span>{user?.email}</span>
                </div>
              </div>

              <div className='flex'>
                <span className='text-sm md:text-lg font-semibold mr-1 text-gray-700 dark:text-gray-300'>Joined On : </span>
                <div className={`text-sm md:text-lg font-semibold text-center dark:text-gray-100`}>
                  <span>{joinedDate || "Not available"}</span>
                </div>
              </div>
            </div>
          </div>
          {isDetailsChanged &&
            <div className='flex justify-center md:justify-start mt-4 md:mt-0 px-3'>
              <button
                className="px-4 py-1 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => {
                  handleSaveChanges({ newName: nameRef.current.value, newProfession: professionRef.current.value })
                  setIsDetailsChanged(false)
                  setIsNameEdting(false)
                  setIsProfessionEdting(false)
                  nameRef.current.value = user?.name
                  professionRef.current.value = user?.profession || ""
                }}
              >Save Changes</button>
            </div>}
        </div>
      </main>
    </div>

  );

}

export default Profile