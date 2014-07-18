m84.mem
=======

.. class:: m84.mem([spec])

    Memory management unit.

    This doesn't do any "memory mangement" at the moment but can be extended 
    at a later time to support banking. It does provide convenience functions 
    for loading and storing values to memory.

    :param array spec.array: Use this backing array of bytes for the memory 
        store instead of creating an empty array.

Methods
-------

.. function:: loadb(address)

    Returns a byte from the memory location at address

.. function:: loadb_zp(address)

    Returns a byte from the zero-page memory location at address. Normally, 
    this is the same as loadb(address), but if the memory debugger is used, 
    an exception is thrown if the address is not within the zero page.

.. function:: storeb(address, value)

    Stores the byte value to the memory location at address.
