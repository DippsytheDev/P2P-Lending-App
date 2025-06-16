import { useForm } from "react-hook-form"
import { useState } from "react"
import { FiInfo, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

type PoolFormData = {
  name: string
  description: string
  interestRate: number
  minAmount: number
  maxAmount: number
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

    const payload = {
      name: data.name,
      description: data.description,
      interestRate: Number(data.interestRate),
      minimumAmount: Number(data.minAmount),
      maximumAmount: Number(data.maxAmount),
    }

    // Add this simple test before your main request
    const testConnection = async () => {
      try {
        const response = await fetch("https://lendpool-api-web.onrender.com")
        console.log("Server reachable:", response.status)
      } catch (error) {
        console.error("Server not reachable:", error)
      }
    }

    // Call this before your form submission
    testConnection()

    // const response = await fetch(
    //   "https://lendpool-api-web.onrender.com/lendpool/api/v1/lender/create-pool",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //     body: JSON.stringify(payload),
    //   }
    // )

      const createPool = async () => {
        try {
          const response = await fetch(
            "https://lendpool-api-web.onrender.com/lendpool/api/v1/lender/create-pool",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify(payload),
            }
          )
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          const data = await response.json()
          setSuccessMessage("Pool created successfully!")
          reset()
          return data
        } catch (error) {
          if (error instanceof Error) {
            setApiError(error.message || "Something went wrong.")
          } else {
            setApiError("An unknown error occurred.")
          }
        }
      }

    const response = await createPool()
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
    
    // console.log(localStorage.getItem("token"))
    

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-2xl space-y-6 border border-blue-100"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-blue-800">Create New Pool</h2>
          <p className="text-blue-600/80">
            Fill in the details below to create a new lending pool
          </p>
        </div>

        {apiError && (
          <div className="flex items-start gap-3 bg-red-50/80 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <FiAlertCircle className="flex-shrink-0 mt-0.5 text-red-500" />
            <p>{apiError}</p>
          </div>
        )}

        {successMessage && (
          <div className="flex items-start gap-3 bg-blue-50/80 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
            <FiCheckCircle className="flex-shrink-0 mt-0.5 text-blue-500" />
            <p>{successMessage}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Pool Name <span className="text-blue-600">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("name", { required: "Pool name is required" })}
                className={`block w-full px-4 py-2.5 rounded-lg border ${
                  errors.name ? "border-red-300" : "border-blue-200"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-blue-300/60`}
                placeholder="e.g., Premium Lending Pool"
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                <FiInfo className="flex-shrink-0" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Pool Description <span className="text-blue-600">*</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
              })}
              rows={4}
              placeholder="Describe the purpose, terms, and conditions of this pool..."
              className={`block w-full px-4 py-2.5 rounded-lg border ${
                errors.description ? "border-red-300" : "border-blue-200"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-blue-300/60`}
            />
            {errors.description && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                <FiInfo className="flex-shrink-0" />
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Interest Rate (%) <span className="text-blue-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  {...register("interestRate", {
                    required: "Interest rate is required",
                    min: { value: 0, message: "Must be at least 0" },
                    max: { value: 100, message: "Must be 100 or less" },
                  })}
                  className={`block w-full px-4 py-2.5 rounded-lg border ${
                    errors.interestRate ? "border-red-300" : "border-blue-200"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-blue-300/60`}
                  placeholder="e.g., 5.5"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-blue-400">
                  %
                </div>
              </div>
              {errors.interestRate && (
                <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                  <FiInfo className="flex-shrink-0" />
                  {errors.interestRate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Minimum Amount <span className="text-blue-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...register("minAmount", {
                    required: "Minimum amount is required",
                    min: { value: 0, message: "Must be at least 0" },
                  })}
                  className={`block w-full px-4 py-2.5 rounded-lg border ${
                    errors.minAmount ? "border-red-300" : "border-blue-200"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-blue-300/60`}
                  placeholder="e.g., 1000"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-blue-400">
                  USD
                </div>
              </div>
              {errors.minAmount && (
                <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                  <FiInfo className="flex-shrink-0" />
                  {errors.minAmount.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Maximum Amount <span className="text-blue-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  {...register("maxAmount", {
                    required: "Maximum amount is required",
                    validate: (value, formValues) =>
                      value >= formValues.minAmount ||
                      "Must be greater than or equal to Min Amount",
                  })}
                  className={`block w-full px-4 py-2.5 rounded-lg border ${
                    errors.maxAmount ? "border-red-300" : "border-blue-200"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-blue-300/60`}
                  placeholder="e.g., 10000"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-blue-400">
                  USD
                </div>
              </div>
              {errors.maxAmount && (
                <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                  <FiInfo className="flex-shrink-0" />
                  {errors.maxAmount.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Pool...
            </span>
          ) : (
            "Create Pool"
          )}
        </button>
      </form>
    </div>
  )
}
