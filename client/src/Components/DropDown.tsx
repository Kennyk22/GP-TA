import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DialogueBox from './DialogueBox'
import FormAddStudent from './FormAddStudent'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDown({array, onSelect, add, remove, name}: {array: string[], onSelect:(e: any)=>any, add?:(e: any)=>any, remove?:(e: any)=>any, name: string}) {

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className=' mt-5 lg:mt-2'>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-gray-300 bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {array.map((el) => {
              return <Menu.Item>
                {({ active }) => (
                  <div className='flex flex-row justify-center content-center'>
                  <button
                    type="button"
                    onClick={onSelect}
                    className={classNames(
                      active ? 'bg-gray-700 text-gray-100' : ' text-gray-100',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    {el}
                  </button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash hover:text-red-600 self-center" viewBox="0 0 16 16" id={el} onClick={remove}>
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </div>
                )}
              </Menu.Item>
            })}
            <Menu.Item>
              {({ active }) => (
                <FormAddStudent />
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
