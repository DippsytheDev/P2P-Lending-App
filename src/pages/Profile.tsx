// src/pages/Profile.tsx
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"

const Profile = () => {
  const { user, setUser } = useAuth()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [idNumber, setIdNumber] = useState("")

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "")
      setLastName(user.lastName || "")
    }
  }, [user])

  const handleSave = () => {
    if (!user) return
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      idNumber,
      email: user.email,
      role: user.role,
    }

    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    alert("Profile saved!")
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <label className="block mb-2">Email</label>
      <input
        type="text"
        className="border rounded p-2 w-full mb-4 bg-gray-100"
        value={user.email}
        readOnly
      />

      <label className="block mb-2">ID Number (optional)</label>
      <input
        type="text"
        className="border rounded p-2 w-full mb-4"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSave}
      >
        Save Profile
      </button>
    </div>
  )
}

export default Profile
