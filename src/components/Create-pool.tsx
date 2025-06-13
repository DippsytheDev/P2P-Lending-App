import { useForm } from "react-hook-form"
import { useState } from "react"

type PoolFormData = {
  name: string
  interestRate: number
  minAmount: number
  maxAmount: number
  durationInMonths: number
}

export default function LenderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PoolFormData>()

  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const onSubmit = async (data: PoolFormData) => {
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
        <label className="block mb-1">Pool Name</label>
        <input
          type="text"
          {...register("name", { required: "Pool name is required" })}
          className="border px-3 py-2 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Interest Rate (%)</label>
        <input
          type="number"
          step="0.1"
          {...register("interestRate", {
            required: "Interest rate is required",
            min: { value: 0, message: "Must be at least 0" },
            max: { value: 100, message: "Must be 100 or less" },
          })}
          className="border px-3 py-2 w-full"
        />
        {errors.interestRate && (
          <p className="text-red-500 text-sm">{errors.interestRate.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Minimum Amount</label>
        <input
          type="number"
          {...register("minAmount", {
            required: "Minimum amount is required",
            min: { value: 0, message: "Must be at least 0" },
          })}
          className="border px-3 py-2 w-full"
        />
        {errors.minAmount && (
          <p className="text-red-500 text-sm">{errors.minAmount.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Maximum Amount</label>
        <input
          type="number"
          {...register("maxAmount", {
            required: "Maximum amount is required",
            validate: (value, formValues) =>
              value >= formValues.minAmount ||
              "Must be greater than or equal to Min Amount",
          })}
          className="border px-3 py-2 w-full"
        />
        {errors.maxAmount && (
          <p className="text-red-500 text-sm">{errors.maxAmount.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Duration (months)</label>
        <input
          type="number"
          {...register("durationInMonths", {
            required: "Duration is required",
            min: { value: 1, message: "Must be at least 1 month" },
          })}
          className="border px-3 py-2 w-full"
        />
        {errors.durationInMonths && (
          <p className="text-red-500 text-sm">
            {errors.durationInMonths.message}
          </p>
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
