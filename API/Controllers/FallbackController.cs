using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[AllowAnonymous] // Or else 401 Unauthorized will be returned
public class FallbackController : Controller // With view support
{
    [HttpGet]
    public IActionResult Index()
    {
        return PhysicalFile
        (
            Path.Combine
            (
                Directory.GetCurrentDirectory(), "wwwroot", "index.html"
            ),
            "text/HTML"
        );
    }
}
