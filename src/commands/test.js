// @flow
import {INFERNO_APP, PREACT_APP, REACT_APP, REACT_COMPONENT} from '../constants'
import {getProjectType} from '../getUserConfig'
import karmaServer from '../karmaServer'
import testInferno from './test-inferno'
import testPreact from './test-preact'
import testReact from './test-react'

import type {ErrBack} from '../types'

const TEST_COMMANDS = {
  [INFERNO_APP]: testInferno,
  [PREACT_APP]: testPreact,
  [REACT_APP]: testReact,
  [REACT_COMPONENT]: testReact,
}

/**
 * Generic test command, invokes the appropriate project type-specific command,
 * or runs with the default test config.
 */
export default function test(args: Object, cb: ErrBack) {
  let projectType
  try {
    projectType = getProjectType(args)
  }
  catch (e) {
    // pass
  }

  if (projectType && TEST_COMMANDS[projectType]) {
    TEST_COMMANDS[projectType](args, cb)
  }
  else {
    karmaServer(args, {}, cb)
  }
}
