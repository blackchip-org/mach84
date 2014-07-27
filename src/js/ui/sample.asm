; Literals
'a, 1234, $abcd, %0101

; Directives
.advance
.alias
.byte
.checkpc
.data
.dword
.dwordbe
.invoke
.macro
.macend
.scope
.scend
.space
.text
.word
.wordbe
.org

; Instructions
adc and asl
bcc bcs beq bit bmi bne bpl bra brk bvc bvs
clc cld cli clv cmp cpx cpy
dec dex dey
eor
inc inx iny
jmp jsr
lda ldx ldy lsr
nop
ora
pha php phx phy pla plp plx ply
rol ror rti rts
sbc sec sed sei sta stx sty
tax tay tsx txa txs tya

; Addressing modes

lda $1234    ; Absolute
lda $1234, x ; Absolute, X
lda $1234, y ; Absolute, Y
asl a        ; Accumulator
jmp ($1234)  ; Indirect
lda #$12     ; Immediate
brk          ; Implied
lda ($12,x)  ; Indexed indirect (izx)
lda ($12),y  ; Indirect indexed (izy)
bne $1234    ; Relatvie
lda $12      ; Zero page
lda $12, x   ; Zero page, X
lda $12, y   ; Zero page, y

; Expressions

lda #$33 + 22
lda #[$33 - $22] + $11 ; parens
lda #$33 * $22
lda #[$33 / $22] * $11
lda #$33 | $22
lda #$33 & $22
lda #$33 ^ $22
lda #foo
lda #<foo ; low byte
lda #>foo ; high byte

; Anonymous labels
        ldx #0
*       lda hello, x
        beq +
        jsr $ffd2
        inx
        bne -
*       rts

; Macro invocation
`print msg

; Hello world
        ldx #0
loop:   lda hello, x
        beq done
        jsr $ffd2
        inx
        bne loop
done:   rts

hello:  .byte "HELLO, WORLD!", 0
