    $( document ).ready(function() {
    	let isConnected = false; 
      let contactAddress ="0xe02cfad8b29d0aad478862facb2e6a9b1fed7bc9";
      let abi =[{"inputs":[{"internalType":"string","name":"initMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
      isMetaMaskconnected();
      if (typeof window.ethereum !== 'undefined') {
         console.log('MetaMask is installed!');
      }
      $('#connectMetamask').click(function() {
            (async () => {
            await connectToMetamask();
            })()
            isConnected = true;
            isMetaMaskconnected();
      });

      $('#getMessage').click(function() {
          (async () => {
            await getMessage();
        })()
      });


      $('#updateMessage').click(function() {
          (async () => {
            await updateMessage();
            await updateMessage();
        })()
      });

      async function connectToMetamask(){
             const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
             // Prompt user for account connections
             await provider.send("eth_requestAccounts", []);
             const signer = provider.getSigner();
             const account = await signer.getAddress();
             const balanceInWei = await provider.getBalance(account);
             const balanceInEth= ethers.utils.formatEther(balanceInWei);
             const network = await provider.getNetwork();
             $('#network').text(network.name); 
             $('#chainId').text(network.chainId); 
             $('#accounts').text(account); 
             $('#balance').text(balanceInEth + " ETH"); 

      }
      async function getMessage() {
            let message = await getContract().getMessage();
            $('#disPlayMessage').text(message); 
       }

       async function updateMessage() {
         var messageInput = $('#messageInput').val();
         console.log(messageInput);
         const transaction = await getContractWithSigner().update(messageInput);
         const transactionReceipt = await transaction.wait();
         if (transactionReceipt.status !== 1) {
             alert('error message');
             return;
         } else {
            alert(JSON.stringify(transactionReceipt))
            await connectToMetamask();
         }
       }
       function isMetaMaskconnected() {
           if(isConnected) {
              $('#connectMetamask').hide();
              $('#connected').show();
            } else {
                $('#connectMetamask').show();
                $('#connected').hide();
            }
       }
       function getContract() {
           const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
           const signer = provider.getSigner();
           const contract = new ethers.Contract(contactAddress, abi, signer)
           return new ethers.Contract(contactAddress, abi, provider);
       }
       function getContractWithSigner() {
           const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
           const signer = provider.getSigner();
           const contract = new ethers.Contract(contactAddress, abi, signer)
           return new ethers.Contract(contactAddress, abi, signer);
        }
    });
