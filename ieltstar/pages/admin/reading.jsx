import Admin from '../../components/Layout/Admin'

const reading = () => {
  return (
    <div>
      
    </div>
  )
}

reading.getLayout = function getLayout(page) {
  return (
    <Admin>
      {page}
    </Admin>
  )
}
    

export default reading