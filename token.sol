pragma solidity 0.8.6;
import "hardhat/console.sol";
/* My ethereum token */

abstract contract ERC20Token {
    function name() virtual public view returns (string memory);
    function symbol() virtual public view returns (string memory);
    function decimals() virtual public view returns (uint8);
    function totalSupply() virtual public view returns (uint256);
    function balanceOf(address _owner) virtual public view returns (uint256 balance);
    function transfer(address _to, uint256 _value) virtual public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) virtual public returns (bool success);
    function approve(address _spender, uint256 _value) virtual public returns (bool success);
    function allowance(address _owner, address _spender) virtual public view returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract Owned {
    address public owner;
    address public newOwner;
    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner(){
        require(isOwner(),"this not a owner");
        _;
    }

    function transferOwnership(address _to) public {
        require(msg.sender == owner);
        newOwner = _to;
    }
    function isOwner()public view returns(bool){
        return msg.sender==owner;
    }

    
}

contract Token is ERC20Token, Owned {

    string  _symbol;
    string  _name;
    uint8  _decimal;
    uint  _totalSupply;
    uint   public maxsupply;
    address  _minter;
    address walletA;
    address walletB;
    // uint public tax=10;
    
    mapping(address => uint) balances;
    mapping(address => bool) public isblocked;
    mapping(address=>uint)istimestamp;
    mapping(address=>mapping(address=>uint))public allow;
    uint lockedUntil=1 minutes;

    mapping(address=>bool) public isexcludedfromMax;

    constructor (address _A,address _B) {
        _symbol = "LL20";
        _name = "LOCAL LAND";
        _decimal = 18;
        _totalSupply = 1000000000000000000000;
        maxsupply=100;
        _minter = msg.sender;
        walletA=_A;
        walletB=_B;

        balances[_minter] = _totalSupply;
        isexcludedfromMax[owner]=true;
        
        emit Transfer(address(0), _minter, _totalSupply);

    }
    function user(address _anaddress)public pure{
        require(_anaddress==address(_anaddress),"User not authorized");
    }
    function toblock(address _address)public onlyOwner {
        isblocked[_address]=true;
    }
    function unblock(address _address)public {
        isblocked[_address]=false; 
    }
    function name() public override view returns (string memory) {
        return _name;
    }

    function symbol() public override view returns (string memory) {
        return _symbol;
    }

    // function setTax(uint _tax) public {
    //     tax=_tax;
    // }

    function decimals() public override view returns (uint8) {
        return _decimal;
    }

    function totalSupply() public override view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public override view returns (uint256 balance) {
        return balances[_owner];
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
        require(balances[_from] >= _value);
         _transfer(_to,_value);  
        emit Transfer(_from, _to, _value);


        if(_from!=owner){
            require(istimestamp[_from]<=block.timestamp,"time limit error");
        }

        istimestamp[_from]=block.timestamp+(lockedUntil*1);
        // lockedUntil=block.timestamp+1 minutes;
        // require(lockedUntil<=block.timestamp,"wait for 1minutes");

        return true;
    }

    function transfer(address _to, uint256 _value) public override returns (bool) {
        // if(_to!=owner){
        //  require(!isblocked[_to],"user blocked");
        // }
    //     if(!isExcludedfromblock[msg.sender]){
    //   require(!isblocked[_to],"user blocked");
    //     }

     _transfer(_to,_value);

        return true;
        
    }
    

    function approve(address _spender, uint256 _value) public  override returns (bool success) {
        allow[msg.sender][_spender]=_value;
        return true;
    }

     
    function allowance(address _owner, address _spender) public override view returns (uint256 remaining) {
        return remaining;
    }

    function mint(uint amount) public returns (bool) {
        require(msg.sender == _minter);
        balances[_minter] += amount;
        _totalSupply += amount;
        return true;
    }

    function _transfer(address _to, uint amount) internal {

          require(!isblocked[msg.sender],"user blocked");
         

        if(!isexcludedfromMax[msg.sender]){
           require(amount<maxsupply,"MaxTx");
        }

        uint tax =10; 
        uint local= amount*tax/100;
        uint share=local/2;
        console.log(tax);
        console.log(local);
        uint remain=amount-local;
        balances[walletA]+=share;
        balances[walletB]+=share;
        
        console.log(remain);
        
        balances[msg.sender]-=amount;
        // balances[owner]+=local;
        balances[_to]+=remain;
    }

    function excludeMaxTx(address _addr) external {
        require(msg.sender==owner,"!owner");
        isexcludedfromMax[_addr]=true;
    }

    function IncludeInMaxTx(address _addr) external {
        require(msg.sender==owner,"!owner");
            isexcludedfromMax[_addr]=false;

    }


}



// contract depositErc20 is Token{
//     ERC20Token public token;


//      function depositToken(address _token,uint _amount) public {
        
//          ERC20Token(_token).approve(address(this), _amount);

//         ERC20Token(_token).transferFrom(msg.sender,address(this),_amount);
//     }
// }   
