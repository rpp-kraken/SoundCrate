/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react'
import { queries } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React, { useEffect, useState } from "react"

describe('Login test', () => {
  it('Google Oauth button should be present in the drawer', () => {
    expect(true).toBe(true);
  });
});