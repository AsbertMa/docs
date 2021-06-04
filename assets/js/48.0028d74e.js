(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{526:function(e,t,n){"use strict";n.r(t);var a=n(56),o=Object(a.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"transaction-dependency"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#transaction-dependency"}},[e._v("#")]),e._v(" Transaction Dependency")]),e._v(" "),n("p",[e._v("VeChainThor provides a safety mechanism that allows users to force a TX to depend on the success of another TX. In other words, if this feature is turned on, the system will check the status of the TX the current TX depends on. Only if the status says successful, then the current TX will be accepted for processing by the system.\nHere by successful, we mean two things:\nthe TX has been included in the ledger, and\nit has been successfully executed, or not reverted in the blockchain language.\nThe second requirement is particularly important since seeing a TX included in the ledger does not guarantee that it has been successfully executed. A TX can be included, but with a status “Reverted” which means that the system does not actually do what the TX asks it to do. In practice, a TX can be reverted due to the insufficient amount of gas provided by the sender. It can also be reverted by the smart-contract function it calls. For instance, a TX would be reverted by a token-transfer function if the sender did not have a larger enough token balance.\nNote that you can make your TX to depend on any TX as long as you provide its "),n("em",[e._v("TXID")]),e._v(". For the depended TX, there is no limitation on who sends it or when it is sent or what it is about. It offers developers a lot of flexibilities and we can only do that thanks to the design of the VeChainThor’s TXID.\nLet me explain how such a mechanism is implemented in VeChainThor.\nIt has been done with the help of a field in the TX model, called "),n("code",[e._v("DependsOn")]),e._v(" (see the "),n("code",[e._v("body")]),e._v(" structure defined in "),n("code",[e._v("$THORDIR/tx/transaction.go")]),e._v(") as well as some extra validation logic implemented by the code below for validating TXs within a block (see function verifyBlock in "),n("code",[e._v("$THORDIR/consensus/validator.go")]),e._v(").")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('// check depended tx \nif dep := tx.DependsOn(); dep != nil { \n  found, reverted, err := findTx(*dep) \n  if err != nil { \n    return nil, nil, err \n  } \n  if !found { \n    return nil, nil, consensusError("tx dep broken") \n  } \n  if reverted { \n    return nil, nil, consensusError("tx dep reverted") \n  } \n}\n')])])]),n("p",[e._v("Now let us have a close look at the code.\nAccording to its definition, "),n("code",[e._v("DependsOn")]),e._v(" is a pointer pointing to the ID of the TX it depends on. The first thing the code does is to get the value of the current TX's "),n("code",[e._v("DependsOn")]),e._v(" value via "),n("code",[e._v("dep := tx.DependsOn()")]),e._v(". If the field is set, it goes to check the status of the referred TX using its TXID through "),n("code",[e._v("found, reverted, err := findTx(*dep)")]),e._v(". The rest of code first checks whether the TX exists and then whether it's been reverted. It rejects the current TX if either check fails.\nDemo\nI made a little demo to demonstrate the effectiveness of the forcible-TX-dependency mechanism I just talked about. The demo code is written in TypeScript and can be found here. I used two newly developed tools connex-framework and connex.driver-nodejs in my code. Together, they provide a convenient way for developers to interact with VeChainThor through the Connex interface in a NodeJS environment.")]),e._v(" "),n("p",[e._v("I hard coded two account addresses, named acc1 and acc2 and acc1's private key,")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("const sk = '0x29a9...1a7'; \nconst acc1 = '0x858...2c4'; \nconst acc2 = '0x914...85d';\n")])])]),n("p",[e._v("and used the VeChain "),n("a",{attrs:{href:"https://faucet.vecha.in/",target:"_blank",rel:"noopener noreferrer"}},[e._v("TestNet Faucet"),n("OutboundLink")],1),e._v(" to acquire sufficient funds for running the demo on the VeChainThor testnet.\nWhat does the demo do?\nThe demo does the following things:")]),e._v(" "),n("ol",[n("li",[e._v("It sends TX "),n("code",[e._v("TX1")]),e._v(" that transfers 1 VET from "),n("code",[e._v("acc1")]),e._v(" to "),n("code",[e._v("acc2")]),e._v(". "),n("code",[e._v("TX1")]),e._v(" is given sufficient amount of gas to allow it be successfully executed;")]),e._v(" "),n("li",[e._v("It sends TX "),n("code",[e._v("TX2")]),e._v(" that transfers 1 VTHO from "),n("code",[e._v("acc1")]),e._v(" to "),n("code",[e._v("acc2")]),e._v(". "),n("code",[e._v("TX2")]),e._v(" is given insufficient amount of gas to make it reverted;")]),e._v(" "),n("li",[e._v("It sends TX "),n("code",[e._v("TX3")]),e._v(" that transfers 1 VET from "),n("code",[e._v("acc1")]),e._v(" to "),n("code",[e._v("acc2")]),e._v(" and depends on a TX not existing in the ledger;")]),e._v(" "),n("li",[e._v("It sends TX "),n("code",[e._v("TX4")]),e._v(" that transfers 1 VET from "),n("code",[e._v("acc1")]),e._v(" to "),n("code",[e._v("acc2")]),e._v(" and depends on "),n("code",[e._v("TX1")]),e._v(";")]),e._v(" "),n("li",[e._v("It sends TX "),n("code",[e._v("TX5")]),e._v(" that transfers 1 VET from "),n("code",[e._v("acc1")]),e._v(" to "),n("code",[e._v("acc2")]),e._v(" and depends on "),n("code",[e._v("TX2")]),e._v(";")]),e._v(" "),n("li",[e._v("It then checks the status of the above five TXs whenever a new block is incoming within the period of five new blocks. It will show that "),n("code",[e._v("TX3")]),e._v(" and "),n("code",[e._v("TX5")]),e._v(" cannot be found since the TXs they depend on prevent them from being processed.\nNote that I constructed TXs depending on TXs sent from the same account just for convenience. In practice, you can make your TX to depend on any TX as long as you provide its TXID.\nResults\nNow let us have a look at what the demo outputs for my run.")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("Sent TX1 with ID = 0x6f7874438429ce31d89b68ceb1dacf3fba012149b57f9781f6d9b5c707eedde5\n... \nSent TX2 with ID = 0x9f8f9bec9593f74d9353ac7f1087afa32646638155e6a448dc35d60788d958b5 ... \nSent TX3 with ID = 0x319b70009a8234107a2d08c3dbf9e93396330892badb03b5c4cebac391d68c2d TX3 depends on an nonexisting TXID \n... \nSent TX4 with ID = 0x1c30f07aae653711ab3284062afe557f1674c56d625114326230b041d79f9931 TX4 depends on TX1 \n... \nSent TX5 with ID = 0xd92e5ffcf3e9ff11f33c59b814869c23df75c7cc49773fcb95ccc8b9bd420a43 TX5 depends on TX2 ...\n")])])]),n("p",[e._v("The first few lines give me some information of the five TXs the demo just created and sent to the VeChainThor testnet. We can see their TXIDs as well as all the TX dependencies. Note that The demo deliberately sets the "),n("code",[e._v("DependsOn")]),e._v(" value of "),n("code",[e._v("TX3")]),e._v(" as "),n("code",[e._v("0x1")]),e._v(", which means that "),n("code",[e._v("TX3")]),e._v(" depends on a TX with a TXID equal to 0x1. Such a TX has not been found by far.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("-------------------------- \nBlock Number = 3170840 \n-------------------------- \n... \nChecking TX1 with ID = 0x6f7874438429ce31d89b68ceb1dacf3fba012149b57f9781f6d9b5c707eedde5 ... \nTX1 found! If reverted: false \n... \nChecking TX2 with ID = 0x9f8f9bec9593f74d9353ac7f1087afa32646638155e6a448dc35d60788d958b5 ... \nTX2 found! If reverted: true \n... \nChecking TX3 with ID = 0x319b70009a8234107a2d08c3dbf9e93396330892badb03b5c4cebac391d68c2d ... \nTX3 not found! \n... \nChecking TX4 with ID = 0x1c30f07aae653711ab3284062afe557f1674c56d625114326230b041d79f9931 ... \nTX4 not found! \n... \nChecking TX5 with ID = 0xd92e5ffcf3e9ff11f33c59b814869c23df75c7cc49773fcb95ccc8b9bd420a43 ... \nTX5 not found! \n...After sending the TXs, the demo starts to check their status in the ledger every time it detects a new block, lasting for five consecutive blocks. At the time I ran the code, the first incoming new block was at the height of 3170840. The corresponding output shows that TX1 and TX2 were already included in the ledger. Moreover, we can see that TX2 was reverted by the system as what we wanted it to be.\n")])])]),n("p",[e._v("After sending the TXs, the demo starts to check their status in the ledger every time it detects a new block, lasting for five consecutive blocks. At the time I ran the code, the first incoming new block was at the height of 3170840. The corresponding output shows that TX1 and TX2 were already included in the ledger. Moreover, we can see that TX2 was reverted by the system as what we wanted it to be.")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("-------------------------- \nBlock Number = 3170841 \n-------------------------- \n... \nChecking TX3 with ID = 0x319b70009a8234107a2d08c3dbf9e93396330892badb03b5c4cebac391d68c2d ... \nTX3 not found! \n... \nChecking TX4 with ID = 0x1c30f07aae653711ab3284062afe557f1674c56d625114326230b041d79f9931 ... \nTX4 found! If reverted: false \n... \nChecking TX5 with ID = 0xd92e5ffcf3e9ff11f33c59b814869c23df75c7cc49773fcb95ccc8b9bd420a43 ... \nTX5 not found! \n...\nAt the next block height (3170841), TX4 was logged in the ledger, but not TX3 and TX5. As expected, they were not found in the ledger at the next three block heights.\n\n")])])]),n("h2",{attrs:{id:"conclusion"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#conclusion"}},[e._v("#")]),e._v(" Conclusion")]),e._v(" "),n("p",[e._v("In this article, I have described and demonstrated one particular VeChainThor feature that allows users to force a transaction dependency. In particular, if a TX is made to depends on another TX, it would be accepted for processing only when the referred TX has existed in the ledger and not been reverted.")])])}),[],!1,null,null,null);t.default=o.exports}}]);