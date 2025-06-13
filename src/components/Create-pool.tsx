import { useForm } from "react-hook-form"
import { useState } from "react"

type LenderFormData = {
    name: string
    email: string
    interestRate: number
    terms: string
    
}


  export default function LenderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LenderFormData>()

  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const onSubmit = async (data: LenderFormData) => {
    try {
      setApiError(null)
      setSuccessMessage(null)

      const response = await fetch("http://localhost:5000/api/pools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create pool.")
      }

      setSuccessMessage("Pool created successfully!")
      reset()
    } catch (error: any) {
      setApiError(error.message || "Something went wrong.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      {apiError && <p className="text-red-500">{apiError}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <div>
        <label className="block mb-1">Full Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="border px-3 py-2 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          className="border px-3 py-2 w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      

      <div>
        <label className="block mb-1">Interest Rate</label>
        <input
          type="number"
          step="0.01"
          {...register("interestRate", {
            required: "Interest rate is required",
            min: { value: 0, message: "Cannot be negative" },
            max: { value: 100, message: "Must be 100 or less" },
          })}
          className="border px-3 py-2 w-full"
        />
        {errors.interestRate && (
          <p className="text-red-500 text-sm">{errors.interestRate.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Terms</label>
        <input
          type="text"
          {...register("terms", { required: "Terms of loan is required" })}
          className="border px-3 py-2 w-full"
        />
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
      </div>


      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  )
}
