import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import type { Category } from 'src/types/category.type'
import type { QueryConfig } from '../ProductList'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { schema, type Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import type { NoUndefined } from 'src/types/utils.type'
import RatingStars from '../RatingStars'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormDataFilter = NoUndefined<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_max', 'price_min'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormDataFilter>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema) as any
  })

  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min || '',
        price_max: data.price_max || ''
      }).toString()
    })
  })

  const handleRemoveAll = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_max', 'price_min', 'rating_filter', 'category'])).toString()
    })
  })
  const { category } = queryConfig
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6 mr-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
        TẤT CẢ DANH MỤC
      </Link>
      <div className='bg-gray-200 h-[1px] my-4' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li key={categoryItem._id} className='py-2 pl-2'>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'text-orange font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='size-5 fill-orange absolute left-[-14px] '
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* bo loc tim kiem */}
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-5 mr-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
          />
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-200 h-[1px] my-4' />
      <div className='my-5'>
        <div className=''>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameError='hidden'
                    placeholder='Từ'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_max')
                    }}
                    classNameInput='px-1 py-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 flex-shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameError='hidden'
                    placeholder='Đến'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_min')
                    }}
                    classNameInput='px-1 py-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 text-red-600 min-h-[1.3rem] text-sm text-center'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center  '>
            APPLY
          </Button>
        </form>
      </div>

      {/* Danh gia */}
      <div className='bg-gray-200 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='bg-gray-200 h-[1px] my-4'>
        <Button
          onClick={handleRemoveAll}
          className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center  '
        >
          xóa tất cả
        </Button>
      </div>
    </div>
  )
}
