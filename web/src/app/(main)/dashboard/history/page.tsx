import { FiBriefcase, FiSmile, FiMeh, FiFrown } from 'react-icons/fi'

export default function History() {
  return (
    <main className="  max-w-4xl mx-auto  pt-14  px-6 pb-11 ">
      <section className="flex justify-between">
        <div className="py-5 px-4 pr-6 border-2 border-slate-200 rounded-lg">
          <FiBriefcase size={32} color="#1E3A8A" />
          <div className="flex mt-4 items-center gap-4  ">
            <span className="max-w-100 font-poppins text-slate-400 block">
              Total de atividades{' '}
            </span>
            <strong className="text-xl font-poppins font-semibold text-blue-900">
              20
            </strong>
          </div>
        </div>

        <div className="py-5 px-4 pr-6 border-2 border-slate-200 rounded-lg">
          <FiSmile size={32} color="#16A34A" />
          <div className="flex mt-4 items-center gap-4  ">
            <span className="max-w-100 font-poppins text-slate-400 block">
              Avaliações positivas{' '}
            </span>
            <strong className="text-xl font-poppins font-semibold text-blue-900">
              20
            </strong>
          </div>
        </div>

        <div className="py-5 px-4 pr-6 border-2 border-slate-200 rounded-lg">
          <FiMeh size={32} color="#CA8A04" />
          <div className="flex mt-4 items-center gap-4 ">
            <span className="max-w-100 font-poppins text-slate-400 block">
              Avaliações neutras{' '}
            </span>
            <strong className="text-xl font-poppins font-semibold text-blue-900">
              20
            </strong>
          </div>
        </div>

        <div className="py-5 px-4 pr-6 border-2 border-slate-200 rounded-lg">
          <FiFrown size={32} color="#E11D48" />
          <div className="flex mt-4 items-center gap-4 ">
            <span className="max-w-100 font-poppins text-slate-400 block">
              Avaliações negativas{' '}
            </span>
            <strong className="text-xl font-poppins font-semibold text-blue-900">
              20
            </strong>
          </div>
        </div>
      </section>
      <div className="mt-8  border  px-6 border-slate-200 rounded-lg rounded-b-none ">
        <table className="w-full border-separate">
          <thead>
            <tr>
              <th className="text-start font-poppins font-medium text-slate-500 py-4  ">
                Tipo
              </th>
              <th className="text-start font-poppins font-medium text-slate-500 py-4 ">
                Nome da oportunidade
              </th>
              <th className="text-start font-poppins font-medium text-slate-500 py-4 ">
                Valor
              </th>
              <th className="text-start font-poppins font-medium text-slate-500 py-4 ">
                Status
              </th>
              <th className="text-start font-poppins font-medium text-slate-500 py-4 ">
                Avaliação
              </th>
              <th className="text-start font-poppins font-medium text-slate-500 py-4 ">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-start py-2">
                <span className="text-slate-700 flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full">
                  <FiBriefcase size="24" />
                </span>
              </td>
              <td className="text-start py-2 font-poppins font-medium ">
                Faxineira
              </td>
              <td className="text-start py-2  font-poppins text-slate-500">
                R$ 2000.00
              </td>
              <td className="text-start py-2 font-poppins text-yellow-500 ">
                pendente
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                indefinido
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                20/09/2023
              </td>
            </tr>
            <tr>
              <td className="text-start py-2">
                <span className="text-slate-700 flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full">
                  <FiBriefcase size="24" />
                </span>
              </td>
              <td className="text-start py-2 font-poppins font-medium ">
                Faxineira
              </td>
              <td className="text-start py-2  font-poppins text-slate-500">
                R$ 2000.00
              </td>
              <td className="text-start py-2 font-poppins text-yellow-500 ">
                pendente
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                indefinido
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                20/09/2023
              </td>
            </tr>

            <tr>
              <td className="text-start py-2">
                <span className="text-slate-700 flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full">
                  <FiBriefcase size="24" />
                </span>
              </td>
              <td className="text-start py-2 font-poppins font-medium ">
                Faxineira
              </td>
              <td className="text-start py-2  font-poppins text-slate-500">
                R$ 2000.00
              </td>
              <td className="text-start py-2 font-poppins text-yellow-500 ">
                pendente
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                indefinido
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                20/09/2023
              </td>
            </tr>

            <tr>
              <td className="text-start py-2">
                <span className="text-slate-700 flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full">
                  <FiBriefcase size="24" />
                </span>
              </td>
              <td className="text-start py-2 font-poppins font-medium ">
                Faxineira
              </td>
              <td className="text-start py-2  font-poppins text-slate-500">
                R$ 2000.00
              </td>
              <td className="text-start py-2 font-poppins text-yellow-500 ">
                pendente
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                indefinido
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                20/09/2023
              </td>
            </tr>

            <tr>
              <td className="text-start py-2">
                <span className="text-slate-700 flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full">
                  <FiBriefcase size="24" />
                </span>
              </td>
              <td className="text-start py-2 font-poppins font-medium ">
                Faxineira
              </td>
              <td className="text-start py-2  font-poppins text-slate-500">
                R$ 2000.00
              </td>
              <td className="text-start py-2 font-poppins text-yellow-500 ">
                pendente
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                indefinido
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                20/09/2023
              </td>
            </tr>

            <tr>
              <td className="text-start py-2">
                <span className="text-slate-700 flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full">
                  <FiBriefcase size="24" />
                </span>
              </td>
              <td className="text-start py-2 font-poppins font-medium ">
                Faxineira
              </td>
              <td className="text-start py-2  font-poppins text-slate-500">
                R$ 2000.00
              </td>
              <td className="text-start py-2 font-poppins text-yellow-500 ">
                pendente
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                indefinido
              </td>
              <td className="text-start py-2 font-poppins text-slate-500">
                20/09/2023
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </main>
  )
}
