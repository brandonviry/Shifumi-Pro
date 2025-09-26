import { AIEngine, AIType } from '@/types'
import { RandomAI } from './RandomAI'
import { WeightedAI } from './WeightedAI'
import { AdaptiveAI } from './AdaptiveAI'

export class AIFactory {
  static create(type: AIType): AIEngine {
    switch (type) {
      case 'random':
        return new RandomAI()
      case 'weighted':
        return new WeightedAI()
      case 'adaptive':
        return new AdaptiveAI()
      default:
        return new RandomAI()
    }
  }
}