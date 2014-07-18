m84.cpu
=======

.. class:: m84.cpu([spec])

    The 6502 central processing unit.
    
    :param m84.mem spec.mem: Memory to use
    :param m84.ops spec.ops: Executors to use
    :param m84.map spec.map: Memory map to use

Attributes
----------

.. attribute:: a
    
    Accumulator register, byte

.. attribute:: b

    Break flag, boolean, bit 4 of the status register. In the Mach-84, this 
    flag is set when a break instruction is encountered and the CPU is stopped. 
    On a real 6502, this generates an interrupt.

.. attribute:: c
    
    Carry flag, boolean, bit 0 of the status register.

    - Addition: Set if there a left over carry bit after performing the 
      operation. This flag should be cleared before starting addition. If set, 
      this adds one to the result.
    - Subtraction: Acts as the 'borrow' flag and is the inverse of the carry. 
      Clear if there is a bit that needs to be borrowed after performing the 
      operation. This flag should be set before starting subtraction. If clear, 
      this subtracts one from the result.
    - Shifting: Holds the value of the bit that was shifted out.

.. attribute:: d

    Decimal math (BCD) flag, boolean, bit 3 of the status register.

    When set, addition and subtraction is based on BCD numbers instead of 
    binary numbers. When clear, ``$09 + $01 = $0A``, and when set, 
    ``$09 + $01 = $10``.

.. attribute:: i

    Interrupt disable flag, boolean, bit 2 of the status register. If set, 
    the IRQ line is ignored.

.. attribute:: n
    
    Sign (negative) flag, boolean, bit 7 of the status register. Set if the 
    value loaded into a register has bit 7 set.

.. attribute:: pc

    Program counter, word. The next instruction is fetched from this memory 
    location.

.. attribute:: sp

    Stack pointer, byte. Offset from the bottom of the stack, $0100.

.. attribute:: v

    Overflow flag, boolean, bit 6 of the status register. This flag is set 
    when an arithmetic operation causes an overflow on a signed value. For 
    example, the operation ``$7F + $01`` sets the bit since the answer, 128, is 
    too large to fit in a single signed byte.

.. attribute:: x

    X index register, byte.

.. attribute: y

    Y index register, byte.

.. attribute: z

    Zero flag, boolean, bit 1 of the status register. Set when a register is 
    loaded with a zero value.

Methods
-------

.. function:: execute()

    Executes the next instruction.

.. function:: reset()

    Resets the CPU. The program counter is set with the value found in the warm 
    start vector.

.. function:: sr()

    Returns the value of the status register as a byte.

.. function:: sr(registers)

    Sets the value of the status register using the *registers* byte. If bit 5 
    is cleared, the value is ignored as that bit is hard-wired on.

.. function:: status()

    String representation of the CPU status. Returns a string in the format of:

    ```
     pc  sr ac xr yr sp  n v - b d i z c
    0000 20 00 00 00 00  . . * . . . . .
    ```
