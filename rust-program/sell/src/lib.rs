use borsh::{BorshDeserialize, BorshSerialize};

use solana_program::{
    account_info::{next_account_info, AccountInfo},
    borsh::try_from_slice_unchecked,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct SaleAccount {
    pub owner: String,
    pub nft_address: String,
    pub price: String,
    pub is_available: String,
}


entrypoint!(process_instruction);
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    
    let nft_account = next_account_info(accounts_iter)?;

    //checks if the blockchain is accessed by original program (here owner is Program)
    if nft_account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    //gives the instruction to operate upon
    let (instruction_byte, rest_of_data) = data.split_first().unwrap();


    if *instruction_byte == 0 {
        //retrieve the pubkey of owner
        let nft_account_owner = next_account_info(accounts_iter)?;
        let price = String::from_utf8(rest_of_data[..10].to_vec()).unwrap();


 
        let mut nft_account_data: SaleAccount =
                    try_from_slice_unchecked(&nft_account.data.borrow()).map_err(|err| {
                        msg!("Receiving message as string utf8 failed, {:?}", err);
                        ProgramError::InvalidInstructionData
                    })?;
        nft_account_data.owner = nft_account_owner.key.to_string();
        nft_account_data.nft_address=nft_account.key.to_string();
        nft_account_data.price = price;
        nft_account_data.is_available = "1".to_string();

        nft_account_data
            .serialize(&mut &mut nft_account.data.borrow_mut()[..])
            .map_err(|err| {
                msg!("Receiving message as string utf8 failed, {:?}", err);
                ProgramError::InvalidInstructionData
            })?;
    }

    if *instruction_byte == 1 {
        let mut nft_account_data: SaleAccount =
            try_from_slice_unchecked(&nft_account.data.borrow()).map_err(|err| {
                msg!("Receiving message as string utf8 failed, {:?}", err);
                ProgramError::InvalidInstructionData
            })?;

        nft_account_data.is_available = "0".to_string();
        
        nft_account_data
            .serialize(&mut &mut nft_account.data.borrow_mut()[..])
            .map_err(|err| {
                msg!("Receiving message as string utf8 failed, {:?}", err);
                ProgramError::InvalidInstructionData
            })?;

    }
    Ok(())
}