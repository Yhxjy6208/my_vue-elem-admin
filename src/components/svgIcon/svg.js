const context = require.context('./icon',false,/\.svg$/)
const requireAll = (requireContext)=>{
    console.log(requireContext.keys())
    return requireContext.keys().map(requireContext)
}
requireAll(context)