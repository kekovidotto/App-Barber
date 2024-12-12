import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: { id: string } // ID da barbearia
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params // Certifique-se de aguardar a resolução de params

  // Buscar barbearia no banco de dados
  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
  })

  // Retornar erro 404 caso não encontre a barbearia
  if (!barbershop) {
    return notFound()
  }
  return (
    <div>
      {/*IMAGE*/}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
          fill
          objectFit="cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
          asChild
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="item-center mb-2 flex gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="item-center flex gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>
      {/*DESCRIÇÃO*/}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>
    </div>
  )
}

export default BarbershopPage
