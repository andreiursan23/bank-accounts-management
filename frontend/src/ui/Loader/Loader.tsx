import { motion } from 'framer-motion'

const Loader: React.FC = () => {
  return (
    <motion.div
      className="w-10 h-10 bg-[#4768fa]"
      data-testid="loader"
      animate={{
        scale: [1, 1.2, 1.2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ['0%', '0%', '50%', '50%', '0%']
      }}
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
  )
}

export default Loader
