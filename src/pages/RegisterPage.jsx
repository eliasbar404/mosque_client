
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useMemberLogin } from '../hooks/useMemberLogin'


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { memberRegister } = useMemberLogin();

  const onSubmit = (data) => memberRegister(data);

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer votre compte
          </h2>
        </div>
        <form className=" mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-col rounded-md shadow-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name" className="sr-only">
                  Prénom
                </Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="Prénom"
                  {...register("first_name", { required: "Le prénom est requis" })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="last-name" className="sr-only">
                  Nom
                </Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Nom"
                  {...register("last_name", { required: "Le nom est requis" })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className='mb-4'>
              <Label htmlFor="email-address" className="sr-only">
                Adresse e-mail
              </Label>
              <Input
                id="email-address"
                type="email"
                autoComplete="email"
                placeholder="Adresse e-mail"
                {...register("email", { 
                  required: "L'adresse e-mail est requise",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresse e-mail invalide"
                  }
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone-number" className="sr-only">
                Numeros de Téléphone
                </Label>
                <Input
                  id="phone-number"
                  type="tel"
                  autoComplete="phone_number"
                  placeholder="Numeros de Téléphone"
                  {...register("phone_number", { 
                    required: "Le numeros de téléphone est requise"})}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                />
                {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>}
              </div>
              <div>
                <Label htmlFor="ville" className="sr-only">
                Vile
                </Label>
                <Input
                  id="ville"
                  type="text"
                  placeholder="Votre Ville"
                  {...register("city", { 
                    required: "Votre Ville est requise"})}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
              </div>
            </div>
            <div className='space-y-3'>
              <div className="relative">
                <Label htmlFor="password" className="sr-only">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Mot de passe"
                  {...register("password", { 
                    required: "Le mot de passe est requis",
                    minLength: {
                      value: 8,
                      message: "Le mot de passe doit contenir au moins 8 caractères"
                    }
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                </button>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>
              <div>
                <Label htmlFor="confirm-password" className="sr-only">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirmer le mot de passe"
                  {...register("password_confirmation", { 
                    required: "Veuillez confirmer votre mot de passe",
                    validate: value => value === password || "Les mots de passe ne correspondent pas"
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                />
                {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation.message}</p>}
              </div>
            </div> 
          </div>

          <div className="flex items-center">
            <Checkbox
              id="agree-terms"
              {...register("agreeToTerms", { required: "Vous devez accepter les conditions" })}
            />
            <Label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              J'accepte les{" "}
              <a href="#" className="font-medium text-primary hover:text-primary-dark">
                conditions d'utilisation
              </a>{" "}
              et la{" "}
              <a href="#" className="font-medium text-primary hover:text-primary-dark">
                politique de confidentialité
              </a>
            </Label>
          </div>
          {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>}

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              S'inscrire
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}