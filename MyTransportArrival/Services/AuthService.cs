namespace MyTransportArrival.Services;

using Abstractions.Dto;
using Abstractions.Entity;
using Exceptions;
using Interfaces;
using Repository;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IJwtService _jwtService;

    public AuthService(ApplicationDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public string Login(UserLoginDto userLogin)
    {
        var userEntity = _context.Users.FirstOrDefault(x => x.Login == userLogin.Login);
        if (userEntity == null)
        {
            throw new UserDoesNotExistException();
        }

        if (!PasswordService.CheckPassword(userLogin.Password, userEntity.PasswordHash, userEntity.Salt))
        {
            throw new WrongPasswordException();
        }

        return _jwtService.GetToken(userEntity);
    }

    public User Register(UserLoginDto userLogin)
    {
        if (DoesUserExist(userLogin.Login))
        {
            throw new UserExistsException();
        }
        
        var hashedPassword = PasswordService.HashPassword(userLogin.Password);
        var newUser = new User
        {
            Login = userLogin.Login,
            PasswordHash = hashedPassword.Hash,
            Salt = hashedPassword.Salt,
            InternalData = ""
        };
        _context.Users.Add(newUser);
        _context.SaveChanges();
        return newUser;
    }
    
    private bool DoesUserExist(string login)
    {
        return _context.Users.Any(x => x.Login == login);
    }
}