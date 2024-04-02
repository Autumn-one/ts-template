import { expect, test, vi } from "vitest"
import { add } from "../src"


test( "发送数据并接收", function ()
{
    expect( add(1,1) ).toBe( 2 )
} )
