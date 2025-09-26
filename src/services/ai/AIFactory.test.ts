import { describe, it, expect } from 'vitest'
import { AIFactory } from './AIFactory'
import { RandomAI } from './RandomAI'
import { WeightedAI } from './WeightedAI'
import { AdaptiveAI } from './AdaptiveAI'

describe('AIFactory', () => {
  it('should create RandomAI for random type', () => {
    const ai = AIFactory.create('random')
    expect(ai).toBeInstanceOf(RandomAI)
    expect(ai.type).toBe('random')
  })

  it('should create WeightedAI for weighted type', () => {
    const ai = AIFactory.create('weighted')
    expect(ai).toBeInstanceOf(WeightedAI)
    expect(ai.type).toBe('weighted')
  })

  it('should create AdaptiveAI for adaptive type', () => {
    const ai = AIFactory.create('adaptive')
    expect(ai).toBeInstanceOf(AdaptiveAI)
    expect(ai.type).toBe('adaptive')
  })

  it('should create RandomAI for unknown type', () => {
    // @ts-expect-error Testing invalid type
    const ai = AIFactory.create('unknown')
    expect(ai).toBeInstanceOf(RandomAI)
    expect(ai.type).toBe('random')
  })

  it('should create different instances for multiple calls', () => {
    const ai1 = AIFactory.create('random')
    const ai2 = AIFactory.create('random')

    expect(ai1).not.toBe(ai2) // Different instances
    expect(ai1.type).toBe(ai2.type) // Same type
  })
})